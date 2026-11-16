---
layout: home

hero:
  name: Handwriting AI API
  text: One request. A handwritten page.
  tagline: Send the text and the page settings. The response returns a short-lived link to a JPEG, PNG, or PDF.
  actions:
    - theme: brand
      text: Quickstart
      link: /quickstart
    - theme: alt
      text: Request access
      link: https://handwriting-ai.com/api-access

features:
  - title: One render call
    details: POST /v1/renders stays open until the files are ready, then returns download links.
  - title: Page settings in the body
    details: Choose the paper, size, margins, ink, and handwriting in the same JSON request.
  - title: Official client
    details: The handwriting-ai package calls the API and can save the downloaded file from Node.js.
---
