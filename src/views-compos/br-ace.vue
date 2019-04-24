<template>
  <div>
    <div class="fuller" :id="divid"></div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers'
/* eslint-disable */
export default {
  props: {
    mode: {
      default: 'text'
    },
    setter: {
    },
    getter: {
    },
  },
  data () {
    return {
      tt: 0,
      isme: false,
      divid: `_brace_${Math.floor(Math.random() * 10000)}`
    }
  },
  watch: {
  },
  beforeDestroy () {
    clearInterval(this.tt)
  },
  mounted () {
    var ace = require('brace')
    require(`brace/mode/javascript`)
    require(`brace/mode/css`)
    require(`brace/mode/glsl`)
    require(`brace/mode/html`)
    require(`brace/mode/markdown`)
    require('brace/theme/monokai')
    require('brace/theme/chrome')
    require('brace/ext/searchbox')

    var editor = ace.edit(this.divid)
    this.editor = editor
    editor.getSession().setMode(`ace/mode/${this.mode}`)
    // editor.setStyle('inconsolata-ace')
    editor.setTheme('ace/theme/monokai')
    editor.setValue(this.getter() || '', 1)
    editor.getSession().setUndoManager(new ace.UndoManager())
    editor.setOption('fontSize', '17px')
    editor.session.setOptions({ tabSize: 2, useSoftTabs: true })
    editor.session.setOption('useWorker', false)

    editor.on('change', () => {
      if (this.isme) {
        return
      }
      this.setter(editor.getValue())
    })

    this.tt = setInterval(() => {
      let t = this.editor.getValue()
      try {
        t = this.getter() || ''
      } catch (e) {
      }
      if (t !== this.editor.getValue()) {
        this.isme = true
        // var curPos = editor.getCursorPosition()
        editor.setValue(t, 1)
        editor.clearSelection()
        // editor.moveCursorTo(curPos.row, curPos.colum)
        this.isme = false
      }
    }, 0)


    editor.$blockScrolling = Infinity
    var commands = [
      {
        name: 'open-files',
        bindKey: {win: 'Ctrl-O', mac: 'Command-O'},
        exec: (editor) => {
          // var val = editor.getValue()
          this.$emit('open')
        },
        readOnly: true // false if this command should not apply in readOnly mode
      },
      {
        name: 'save',
        bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
        exec: (editor) => {
          var val = editor.getValue()
          this.$emit('save', val)
        },
        readOnly: true // false if this command should not apply in readOnly mode
      },
      {
        name: 'multicursor',
        bindKey: {win: 'Ctrl-D', mac: 'Command-D'},
        exec: (editor) => {
          editor.selectMore(1)
        },
        // multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
        readOnly: true // false if this command should not apply in readOnly mode
      }
    ]
    commands.forEach((command) => {
      this.editor.commands.addCommand(command)
    })
  }
}
</script>

<style>
.inconsolata-ace{
  /* font-family: SourceSansPro-Regular, Arial, Helvetica, sans-serif !important; */
}
</style>

<style scoped>
.fuller{
  height: 100%;
  width: 100%;
}
</style>
