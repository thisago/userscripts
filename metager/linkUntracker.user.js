// ==UserScript==
// @name        Metager untracker
// @namespace   Violentmonkey Scripts
// @match       *://metager.org/**
// @grant       none
// @version     1.1
// @author      Thiago Navarro
// @description Removes the tracking redirection from Metager
// ==/UserScript==

/*
  Created at: 12/07/2020 12:23:01 Monday
  Modified at: 07/31/2021 06:47:55 PM Saturday
*/

/*
  link Untracker
*/


const trackUrl = /https:\/\/utkv6nyu\.de\/redir\/clickGate\.php\?.*url=([^&]*)/,
  // trackUrl = /https:\/\/servproc\.de\/redir\/clickGate\.php\?.*url=([^&]*)/,
  metagerEncodedUrl =
    /https:\/\/metager\.[^\/]+\/r\/metager\/([^\/]+\/)*([^\/]+)/,
  metagerUrl = /https:\/\/metager\.[^\/]+\/meta\/(.+)/

;(() => {
  ;[...document.querySelectorAll("a.result-link")].map((a) => {
    a.href = decodeURIComponent(a.href)
    let oldHref = a.href
    max = 10

    while (
      (trackUrl.test(a.href) ||
        metagerEncodedUrl.test(a.href) ||
        metagerUrl.test(a.href)) &&
      max > 0
    ) {
      oldHref = a.href

      if (metagerEncodedUrl.test(a.href)) {
        const base64 = a.href.replace(metagerEncodedUrl, "$2")

        try {
          a.href = atob(base64)
        } catch {
          console.error(`Cannot parse "${base64}" base64`)
        }
      } else if (metagerUrl.test(a.href)) {
        a.href = decodeURIComponent(a.href).replace(metagerUrl, "$1")
      } else {
        a.href = oldHref.replace(trackUrl, "$1")
      }

      if (a.href == oldHref) {
        if (!/.*(\.){3}$/.test(a.title)) {
          a.href = `http://${a.title}`
        }
      }
      max--
    }
    if (a.href != oldHref && a.nextElementSibling) {
      a.nextElementSibling.style.opacity = ".3"
      a.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[1].href =
        a.href
    }

    a.parentElement.previousElementSibling.childNodes[1].childNodes[1].href =
      a.href
  })
})()

// https://metager.org/r/metager/9cd41881fc92c156db78f3f58cde5d68094fecf4/c7881fbb4c9a3e8e9b2deace1cc417f2/aHR0cHM6Ly9zZXJ2cHJvYy5kZS9yZWRpci9jbGlja0dhdGUucGhwP3U9MzM4YjlCbm0mcD1aTWtXOWVTS0pTJm09MTImcz0mcj0mdXJsPWh0dHBzJTNBJTJGJTJGc3VwcG9ydC5taWNyb3NvZnQuY29tJTJGZW4tdXMlMkZ3aW5kb3dzJTJGdXBkYXRlLXdpbmRvd3MtMTAtM2M1YWU3ZmMtOWZiNi05YWYxLTE5ODQtYjVlMDQxMmM1NTZh
// https://metager.org/r/metager/15fe57d3d3b1c2801243de36428a8c76d07c2199/60124195158de3da32b2710753314151/aHR0cHM6Ly9zZXJ2cHJvYy5kZS9yZWRpci9jbGlja0dhdGUucGhwP3U9MzM4YjlCbm0mcD1aTWtXOWVTS0pTJm09MTImcz0mcj0mdXJsPWh0dHBzJTNBJTJGJTJGd3d3Lm1heW9jbGluaWMub3JnJTJGZGlzZWFzZXMtY29uZGl0aW9ucyUyRm11bHRpcGxlLXNjbGVyb3NpcyUyRnN5bXB0b21zLWNhdXNlcyUyRnN5Yy0yMDM1MDI2OQ==
// https://metager.org/r/metager/15fe57d3d3b1c2801243de36428a8c76d07c2199/d5c4db78c29735ea29da396d5d44782a/aHR0cDovL3d3dy5pbWRiLmNvbS9uYW1lL25tMDAwMDM3OS8%3C%3CSLASH%3E%3EcmVmXz1udl9zcl8x
