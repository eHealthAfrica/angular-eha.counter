setlocal wildignore+=dist
setlocal foldlevelstart=2
let $PATH = './node_modules/.bin:' . $PATH
let g:syntastic_javascript_checkers = ['standard']
let g:used_javascript_libs = 'angularjs'
