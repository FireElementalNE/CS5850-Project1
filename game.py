import Queue,threading

q = Queue.Queue()

def gameLoop(tickrate):
    global q
    t = threading.Timer(tickrate, gameLoop, args=(tickrate,))
    t.start()
    try:
        curCommand = q.get(False)
        if curCommand == 'move':
            print 'move command!'
        elif curCommand == 'attack':
            print 'attack command'
        elif curCommand == 'quit':
            t.cancel()    
    except Queue.Empty:
        pass

gameLoop(1)

while 1:
    x = raw_input('>')
    q.put(x)
    if x == 'quit':
        break

print 'we are done'