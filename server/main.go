package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"os"
	"strconv"
	"strings"
	"sync"

	"github.com/go-vgo/robotgo"
)

type Connections struct {
	sync.Mutex
	Conns []net.Conn
}

func (conns *Connections) Add(newConn net.Conn) error {
	conns.Lock()
	defer conns.Unlock()

	newConnAddr := newConn.RemoteAddr()

	for _, conn := range conns.Conns {
		if newConnAddr == conn.RemoteAddr() {
			return fmt.Errorf("connection '%v' already exists", conn)
		}
	}

	conns.Conns = append(conns.Conns, newConn)

	return nil
}

func (conns *Connections) Remove(conn net.Conn) error {
	conns.Lock()
	defer conns.Unlock()

	for i, c := range conns.Conns {
		if conn == c {
			// delete the ith item by replacing it with the last item, since
			// the order doesn't matter
			conns.Conns[i] = conns.Conns[len(conns.Conns)-1]
			conns.Conns = conns.Conns[:len(conns.Conns)-1]
			return nil
		}
	}

	return fmt.Errorf("connection '%v' not in connections '%v'", conn, conns)
}

func getMouseButton(b byte) (string, error) {
	var button string

	switch b {
	case 'r':
		button = "right"
	case 'm':
		button = "center"
	case 'l':
		button = "left"
	default:
		return "", fmt.Errorf("invalid mouse button '%s'", string(b))
	}

	return button, nil
}

func mouseClick(b byte) error {
	button, err := getMouseButton(b)
	if err != nil {
		return err
	}
	robotgo.MouseClick(button, false)
	return nil
}

func mousePress(b byte) error {
	button, err := getMouseButton(b)
	if err != nil {
		return err
	}
	robotgo.MouseToggle("down", button)
	return nil
}

func mouseRelease(b byte) error {
	button, err := getMouseButton(b)
	if err != nil {
		return err
	}
	robotgo.MouseToggle("up", button)
	return nil
}

func mouseMove(msg []byte) error {
	coords := strings.Split(string(msg), " ")

	if len(coords) > 2 {
		return fmt.Errorf("invalid mouse move message: %s", string(msg))
	}

	x, err := strconv.Atoi(coords[0])
	if err != nil {
		return fmt.Errorf("failed to parse x coord '%s': %v", coords[0], err)
	}

	y, err := strconv.Atoi(coords[1])
	if err != nil {
		return fmt.Errorf("failed to parse y coord '%s': %v", coords[1], err)
	}

	robotgo.MoveRelative(x, y)

	return nil
}

func mouseScroll(msg []byte) error {
	input := string(msg)
	distance, err := strconv.Atoi(input)
	if err != nil {
		return fmt.Errorf("failed to parse scroll distance '%s': %v", input, err)
	}

	var direction string
	if distance < 0 {
		distance *= -1
		direction = "up"
	} else {
		direction = "down"
	}

	robotgo.ScrollMouse(distance, direction)
	return nil
}

func keyboardKey(msg []byte) error {
	robotgo.KeyTap(string(msg))
	return nil
}

func keyboardText(msg []byte) error {
	robotgo.TypeStr(string(msg))
	return nil
}

func PerformAction(msg []byte) error {
	if len(msg) < 2 {
		return fmt.Errorf("invalid message '%s'", string(msg))
	}

	switch msg[0] {
	case 'k':
		return keyboardKey(msg[1:])
	case 't':
		return keyboardText(msg[1:])
	case 'c':
		return mouseClick(msg[1])
	case 'p':
		return mousePress(msg[1])
	case 'r':
		return mouseRelease(msg[1])
	case 'm':
		return mouseMove(msg[1:])
	case 's':
		return mouseScroll(msg[1:])
	default:
		return fmt.Errorf("invalid action '%s'", string(msg[0]))
	}
}

func (conns *Connections) HandleConnection(conn net.Conn) {
	defer conns.Remove(conn)
	defer conn.Close()

	if err := conns.Add(conn); err != nil {
		log.Println(err)
		return
	}

	for {
		msg := make([]byte, 128)
		readLen, err := conn.Read(msg)
		if err != nil {
			log.Printf("failed to read message from connection '%v': %v\n", conn, err)
			return
		}

		msg = msg[:readLen]

		if err := PerformAction(msg); err != nil {
			log.Printf("invalid message '%s': %v\n", string(msg), err)
		}
	}
}

func main() {
	var address string
	flag.StringVar(&address, "address", "", "listening address")
	flag.Parse()

	if address == "" {
		flag.Usage()
		os.Exit(1)
	}

	server, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatalf("failed to create server\n")
	}
	defer server.Close()

	conns := &Connections{}

	for {
		conn, err := server.Accept()
		if err != nil {
			log.Println("failed to accept new connection")
			continue
		}
		go conns.HandleConnection(conn)
	}
}
