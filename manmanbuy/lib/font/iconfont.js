(function(window){var svgSprite='<svg><symbol id="icon-icon-" viewBox="0 0 1024 1024"><path d="M445.44 721.92c-69.12 0-135.68-28.16-184.32-76.8-102.4-102.4-102.4-268.8 0-368.64 48.64-48.64 115.2-76.8 184.32-76.8s135.68 28.16 184.32 76.8c102.4 102.4 102.4 268.8 0 368.64-48.64 48.64-112.64 76.8-184.32 76.8z m0-473.6c-56.32 0-110.08 23.04-148.48 61.44-81.92 81.92-81.92 215.04 0 296.96 38.4 38.4 92.16 61.44 148.48 61.44s110.08-23.04 148.48-61.44c81.92-81.92 81.92-215.04 0-296.96-38.4-38.4-92.16-61.44-148.48-61.44z" fill="#333333" ></path><path d="M611.6864 590.1312l271.5392 271.5136-36.224 36.1984L575.488 626.3296z" fill="#333333" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)