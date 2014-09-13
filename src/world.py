import room, functions
class World:
	def __init__(self):
		self.ids = []
		self.rooms = []
	def addRoom(self,r):
		if r.id not in self.ids:
			self.ids.append(r.id)
			self.rooms.append(r)
		else:
			print 'Room %s already in ids' % (r.id)
	def findRoom(self,target):
		for x in self.rooms:
			if x.id == target:
				return x
		return -1
	def move(self,player,target):
		cur = self.findRoom(player.location.id)
		tar = self.findRoom(target)
		if cur == -1: 
			print 'somthing is wrong 1'
			return player
		elif tar == -1:
			print 'somthing is wrong 2'
			return player
		else:
			if tar.id not in cur.adjacent:
				print 'cant go there'
				return player
			else:
				player.location = tar
				return player

