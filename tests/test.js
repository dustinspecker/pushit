'use strict'
import austin from 'austin'
import proxyquire from 'proxyquire'
import test from 'ava'

test('should print stdout on git push success', t => {
  austin.spy(console, 'log')

  const playSoundStub = () => ({
    play(path) {
      t.truthy(path.indexOf('/push.mp3') > -1)
    }
  })

  const spawnSyncStub = (command, args) => {
    t.truthy(command === 'git')
    t.truthy(args.indexOf('push') > -1)
    t.truthy(args.length > 1)

    return {
      stdout: {
        toString: () => 'good!'
      }
    }
  }

  proxyquire('../lib', {
    /* eslint-disable camelcase */
    child_process: {
    /* eslint-enable camelcase */
      spawnSync: spawnSyncStub
    },
    'play-sound': playSoundStub
  })

  t.truthy(console.log.calledWith('good!'))
  console.log.restore()
})

test('should print stderr on git push error', t => {
  austin.spy(console, 'log')

  const playSoundStub = () => ({
    play: () => undefined
  })

  const spawnSyncStub = () => ({
    stdout: '',
    stderr: {
      toString: () => 'bad!'
    }
  })

  proxyquire('../lib', {
    /* eslint-disable camelcase */
    child_process: {
    /* eslint-enable camelcase */
      spawnSync: spawnSyncStub
    },
    'play-sound': playSoundStub
  })

  t.truthy(console.log.calledWith('bad!'))
})
