# Slides

This is a workshop/presentation to educate people about Progressive Web Applications, Service Workers
and tips to easily include them in production.

Uses [reveal.js](http://revealjs.com/) for its slides.
Code screenshots generated with [carbon](https://carbon.now.sh).

### Setup

Some reveal.js features, like external Markdown and speaker notes, require that presentations run from a local web server. The following instructions will set up such a server as well as all of the development tasks needed to make edits to the reveal.js source code.

1. Install [Node.js](http://nodejs.org/) (4.0.0 or later)
2. Clone the repository
   ```sh
   $ git clone https://github.com/andreasvirkus/pwa-workshop.git
   ```
3. Navigate to the slides folder
   ```sh
   $ cd pwa-workshop/slides
   ```
4. Install dependencies
   ```sh
   $ npm install
   ```
5. Serve the presentation and monitor source files for changes
   ```sh
   $ npm start
   ```
6. Open <http://localhost:8000> to view your presentation

   You can change the port by using `npm start -- --port=8001`.

   These slides make heavy use of notes, so make sure to open up the speaker view with **S** key.

### Folder Structure

- **css/** Core styles without which the project does not function
- **js/** Like above but for JavaScript
- **plugin/** Components that have been developed as extensions to reveal.js
- **lib/** All other third party assets (JavaScript, CSS, fonts)
