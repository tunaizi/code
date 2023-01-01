#!/usr/bin/python3
# -*- coding: UTF-8 -*-
"""
@author:tunaiz
@file:app.py
@time:2023/01/01
"""

from flask import Flask, redirect, url_for, request, render_template

app = Flask(__name__, template_folder="temp")


@app.route('/login', )
def login():
    return render_template('login.html')


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        user = request.form['nm']
        print(user)
    else:
        user = request.args.get('nm')
        print(user)

    if user == None:
        return redirect(url_for('login'))
    else:
        return f'welcome %s' % user


@app.route('/test')
def test():
    return render_template('test.html')


@app.route('/domain')
def domain():
    return render_template('domain.html')


@app.route('/redirect')
def testredirect():
    return redirect(url_for('test'))


@app.route('/getdata')
def getdata():
    reslist = []
    for i in [1, 2, 3, 4, 5, 6, 7, 8]:
        reslist.append({'key': i, 'nam': f'this a  %s' % i})
    return app.json.response(reslist)


if __name__ == '__main__':
    app.run(debug=True, port=3000)
