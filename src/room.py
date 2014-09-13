import object
class Room:
	def __init__(self,i,d,o,a):
		self.id = i
		self.description = d
		self.objects = o
		self.adjacent = a