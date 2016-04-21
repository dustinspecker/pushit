#!/usr/bin/env node
'use strict'
import playSound from 'play-sound'
import {spawnSync} from 'child_process'

playSound().play(`${__dirname}/push.mp3`)

const argsToPassToGit = process.argv.slice(2, process.argv.length)
const gitPush = spawnSync('git', ['push'].concat(argsToPassToGit))
const gitResponse = gitPush.stdout.toString() || gitPush.stderr.toString()

console.log(gitResponse)
