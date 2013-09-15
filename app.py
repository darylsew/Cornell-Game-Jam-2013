from flask import Flask, render_template
app = Flask(__name__)

init = ['','']

init[0] = """[

			//bounds
			{
				id : "ground",
				x : canvasWidth / SCALE,
				y : canvasHeight / SCALE,
				halfHeight : 1,
				halfWidth : canvasWidth / SCALE,
				color : '#DBC696'
			}, {
				id : "leftwall",
				x : -0.5,
				y : canvasHeight / 2 / SCALE,
				halfHeight : canvasHeight / SCALE,
				halfWidth : 0.5,
				color : '#DBC696'
			}, {
				id : "rightwall",
				x : canvasWidth * 2 / SCALE + 0.5,
				y : canvasHeight / 2 / SCALE,
				halfHeight : canvasHeight / SCALE,
				halfWidth : 0.5,
				color : '#DBC696'
			},

			//character
			{
				id : "torso",
				x : 6.5,
				y : 7.2,
				halfHeight : 1.1,
				halfWidth : 1.2,
				imgsrc : "../static/assets/character/body.png"
			}, {
				id : "head",
				x : 6.5,
				y : 5,
				radius : 0.9,
				imgsrc : "../static/assets/character/head.png"
			}, {
				id : "leftarm",
				x : 4.2,
				y : 6.7,
				angle : 1.3,
				halfHeight : 0.9,
				halfWidth : 0.4,
				imgsrc : "../static/assets/character/leftarm.png"
			}, {
				id : "rightarm",
				x : 8.85,
				y : 6.7,
				angle : -1.3,
				halfHeight : 0.9,
				halfWidth : 0.4,
				imgsrc : "../static/assets/character/rightarm.png"
			}, {
				id : "leftleg",
				x : 5.8,
				y : 9.5,
				angle : 0,
				halfHeight : 1.1,
				halfWidth : 0.5,
				imgsrc : "../static/assets/character/leftleg.png"
			}, {
				id : "rightleg",
				x : 7.2,
				y : 9.5,
				angle : 0,
				halfHeight : 1.1,
				halfWidth : 0.5,
				imgsrc : "../static/assets/character/rightleg.png"
			}, {
				id : "leftshoulder",
				x : 5.4,
				y : 6.4,
				radius : 0.25
			}, {
				id : "rightshoulder",
				x : 7.6,
				y : 6.5,
				radius : 0.25
			}, {
				id : "lefthip",
				x : 5.4,
				y : 8.2,
				radius : 0.3
			}, {
				id : "righthip",
				x : 7.6,
				y : 8,
				radius : 0.3
			},

			//objects
			{
				id : "bed",
				x : 50,
				y : 16,
				halfHeight : 2,
				halfWidth : 3,
				angle : 0,
				imgsrc : "../static/assets/bed.png"
			}, {
				id : "pillow1",
				x : 15,
				y : -100,
				halfHeight : 1,
				halfWidth : 2,
				angle : -0.2,
				imgsrc : "../static/assets/pillow.png"
			}, {
				id : "pillow2",
				x : 7,
				y : -40,
				halfHeight : 1,
				halfWidth : 2,
				angle : -0.2,
				imgsrc : "../static/assets/pillow.png"
			}, {
				id : "pillow3",
				x : 20,
				y : -150,
				halfHeight : 1,
				halfWidth : 2,
				angle : -0.2,
				imgsrc : "../static/assets/pillow.png"
			}]"""

init[1] = """[

			//bounds
			{
				id : "ground",
				x : canvasWidth / SCALE,
				y : canvasHeight / SCALE,
				halfHeight : 1,
				halfWidth : canvasWidth / SCALE,
				color : '#DBC696'
			}, {
				id : "leftwall",
				x : -0.5,
				y : canvasHeight / 2 / SCALE,
				halfHeight : canvasHeight / SCALE,
				halfWidth : 0.5,
				color : '#DBC696'
			}, {
				id : "rightwall",
				x : canvasWidth * 2 / SCALE + 0.5,
				y : canvasHeight / 2 / SCALE,
				halfHeight : canvasHeight / SCALE,
				halfWidth : 0.5,
				color : '#DBC696'
			},

			//character
			{
				id : "torso",
				x : 6.5,
				y : 7.2,
				halfHeight : 1.1,
				halfWidth : 1.2,
				imgsrc : "../static/assets/character/body.png"
			}, {
				id : "head",
				x : 6.5,
				y : 5,
				radius : 0.9,
				imgsrc : "../static/assets/character/head.png"
			}, {
				id : "leftarm",
				x : 4.2,
				y : 6.7,
				angle : 1.3,
				halfHeight : 0.9,
				halfWidth : 0.4,
				imgsrc : "../static/assets/character/leftarm.png"
			}, {
				id : "rightarm",
				x : 8.85,
				y : 6.7,
				angle : -1.3,
				halfHeight : 0.9,
				halfWidth : 0.4,
				imgsrc : "../static/assets/character/rightarm.png"
			}, {
				id : "leftleg",
				x : 5.8,
				y : 9.5,
				angle : 0,
				halfHeight : 1.1,
				halfWidth : 0.5,
				imgsrc : "../static/assets/character/leftleg.png"
			}, {
				id : "rightleg",
				x : 7.2,
				y : 9.5,
				angle : 0,
				halfHeight : 1.1,
				halfWidth : 0.5,
				imgsrc : "../static/assets/character/rightleg.png"
			}, {
				id : "leftshoulder",
				x : 5.4,
				y : 6.4,
				radius : 0.25
			}, {
				id : "rightshoulder",
				x : 7.6,
				y : 6.5,
				radius : 0.25
			}, {
				id : "lefthip",
				x : 5.4,
				y : 8.2,
				radius : 0.3
			}, {
				id : "righthip",
				x : 7.6,
				y : 8,
				radius : 0.3
			},

			//objects
			{
				id : "bed",
				x : 50,
				y : 16,
				halfHeight : 2,
				halfWidth : 3,
				angle : 0,
				imgsrc : "../static/assets/bed.png"
			}, {
				id : "pillow1",
				x : 15,
				y : -100,
				halfHeight : 1,
				halfWidth : 2,
				angle : -0.2,
				imgsrc : "../static/assets/pillow.png"
			}, {
				id : "pillow2",
				x : 7,
				y : -40,
				halfHeight : 1,
				halfWidth : 2,
				angle : -0.2,
				imgsrc : "../static/assets/pillow.png"
			}, {
				id : "pillow3",
				x : 20,
				y : -150,
				halfHeight : 1,
				halfWidth : 2,
				angle : -0.2,
				imgsrc : "../static/assets/pillow.png"
			}, {
				id : "pillow4",
				x : 30,
				y : -250,
				halfHeight : 1,
				halfWidth : 2,
				angle : -0.5,
				imgsrc : "../static/assets/pillow.png"
			}, {
				id : "pillow5",
				x : 35,
				y : -245,
				halfHeight : 1,
				halfWidth : 2,
				angle : -0.5,
				imgsrc : "../static/assets/pillow.png"
			}, {
				id : "bird", //Well everybody's heard, about the bird!
				x : 40,
				y : 16,
				halfHeight : 1.5,
				halfWidth : 1.5,
				angle : 0,
				imgsrc : "../static/assets/bird.png"
			}]"""

@app.route('/')
def lvl1():
    return render_template('index.html',init=init[0])

@app.route('/2')
def lvl2():
    return render_template('index.html',init=init[1])

if __name__ == '__main__':
    app.run(port=9998)
