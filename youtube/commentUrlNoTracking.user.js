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
  Modified at: 07/31/2021 06:25:09 PM Saturday
*/

/*
  comment Url No Tracking
*/

;(() => {
  const interval = setInterval(() => {
    const description = document.querySelector(
      "#description > yt-formatted-string"
    )
    if (description) {
      clearInterval(interval)
      console.log(description)
      ;[...description.querySelectorAll("a")].map((a) => {
        console.log(a.href)
        a.href = decodeURIComponent(
          a.href.replace(
            /https:\/\/www.youtube.com\/redirect\?event=.+&redir_token=.+&q=(.+)/,
            "$1"
          )
        )
        console.log(a.href)
      })
    }
  }, 100)
})()
