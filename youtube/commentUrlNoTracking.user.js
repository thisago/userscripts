// ==UserScript==
// @name        Youtube comment urls tracker remover
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch
// @grant       none
// @version     1.0
// @author      Thiago Navarro
// @description Removes the Youtube link click tracker
// ==/UserScript==

/*
  Created at: 07/31/2021 17:38:05 Saturday
  Modified at: 09/08/2021 01:34:28 PM Wednesday
*/

/*
  comment Url No Tracking
*/

;(() => {
  let checkedTitle = ""
  setInterval(() => {
    const currentTitle = document.querySelector("#container > h1 > yt-formatted-string").innerHTML
    if (checkedTitle != currentTitle) {
      const description = document.querySelector(
        "#description > yt-formatted-string"
      )
      if (description) {
        checkedTitle = currentTitle
        ;[...description.querySelectorAll("a")].map((a) => {
          const url = decodeURIComponent(
            a.href.replace(
              /https:\/\/www.youtube.com\/redirect\?event=.+&redir_token=.+&q=(.+)/,
              "$1"
            )
          )
          a.outerHTML = `<a href="${url}" target="_blank" rel="nofollow" class="yt-simple-endpoint style-scope yt-formatted-string">${url}</a>`
        })
      }
    }
  }, 100)
})()
