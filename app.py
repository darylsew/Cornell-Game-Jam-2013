from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def lvl1():
    return render_template('index.html')

@app.route('/index2.html')
def lvl2():
	return render_template('index2.html')

if __name__ == '__main__':
    app.run(port=9998)
