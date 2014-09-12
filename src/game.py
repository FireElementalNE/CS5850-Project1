import Queue,threading,re
from functions import *
from CONFIG import *
q = Queue.Queue()

def gameLoop(tickrate):
    global q
    t = threading.Timer(tickrate, gameLoop, args=(tickrate,))
    t.start()

    try:
        curCommand = q.get(False)
        if re.match(moveRe,curCommand):
            m = re.match(moveRe,curCommand)
            print 'You wish to move to %s' % (m.group(1))
        elif curCommand == 'status':
        elif curCommand == 'attack':
            print 'attack command'
        elif curCommand == 'quit':
            t.cancel()
        else:
            print 'Invalid command: %s' % (curCommand)
    except Queue.Empty:
        pass

gameLoop(0.1)

while 1:
    x = raw_input()
    q.put(x)
    clearScreen()
    if x == 'quit':
        break

print 'we are done'