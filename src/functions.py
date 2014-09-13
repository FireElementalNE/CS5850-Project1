import os, platform

def runCommandSimple(command):
	os.system(command)

def clearScreen():
	if platform.system() == 'Windows':
		runCommandSimple('cls')
	else:
		runCommandSimple('clear')

