# Übung 5 JavaScript Teil 4: Workflow mit gulp

Zum praktischen Erproben eines Development-Workflows mit dem Tool [gulp](https://gulpjs.com/) soll ein solcher rund um die bereitgestellten Dateien erstellt werden. Ziel ist es, dass die mitgegebene Webseite vollständig (d.h. mit minifiziertem CSS und JavaScript) angezeigt wird und ein Development-Server läuft, der bei Änderungen an den Dateien automatisch einen Reload der Seite ausführt. Das Beispiel folgt dem aus der Vorlesung und erweitert es an einigen Stellen. Um die Aufgabe umsetzen zu können, muss eine aktuelle [Node.js](https://nodejs.org/)-Version lokal auf ihrem Rechner installiert sein.

## Die gegebene Sandbox-Webseite

Sie finden in ihrem Repository eine einfache Webseite, damit Sie diese nicht selbst erstellen müssen, sondern sich auf die Realisierung der Gulp-Tasks fokussieren können. Folgendes ist enthalten:

- `index.html`: Die Hauptseite des Projekts. Sie enthält 4 farbige Boxen (`<div>`-Elemente). Darunter befindet sich eine weitere Reihe von `<div>`-Elementen, die als Farbwähler für die oberen Boxen dienen.
- `_js`: Das Verzeichnis für die JavaScript-Quelldateien. Darin liegt `main.js`, deren Aufgabe es ist, auf die Farbwähler-Boxen Click-Handler zu legen und bei einem Click die darüberliegende Box in der jeweiligen Farbe darzustellen.
- `_scss`: Das Verzeichnis für die SCSS (Sass)-Quelldateien. Hier ist die komplette Formatierung der Seite enthalten, die `.scss`-Dateien müssen aber zunächst in CSS konvertiert werden, damit sie vom Browser verstanden werden. Folgende Dateien sind enthalten:
  - `_base.scss`: Enthält grundsätzliche Formatierungen für die Seite.
  - `_boxes.scss`: Formatiert die vier großen Boxen, deren Farben geändert werden können.
  - `_colors.scss`: Definiert Variablen für alle auf der Seite verwendeten Farben.
  - `_colorswitcher.scss`: Enthält die Formatierungen für den Farbwechsler.
  - `_mixins.scss`: Enthält Mixins, wie das zum schnellen Erstellen der großen Box.
  - `main.scss`: Die Hauptdatei, die alle anderen Partials (beginnen mit `_`) einbindet und zusammenführt. Sie soll schließlich in CSS konvertiert werden.

## SASS mit Minification und Sourcemaps

Erstellen Sie einen Task `styles`, der die SCSS-Datei `main.scss` im Ordner `_scss` zunächst in CSS umwandelt, dann minifiziert und für diese Datei Sourcemaps generiert. Die fertige CSS-Datei soll im Ordner `css` als `main.css` liegen. Als solche wird sie in der HTML-Datei eingebunden.

Sie benötigen dafür die folgenden Gulp-Plugins (Node.js Packages):

- [gulp-sass](https://www.npmjs.com/package/gulp-sass),
- [sass](https://www.npmjs.com/package/sass),
- [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano),
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps).

Darüber hinaus noch das Package [gulp](https://www.npmjs.com/package/gulp) um die Tasks definieren zu können.

Folgende Dinge sind zu tun:

1. Die Packages – allen voran gulp – mit `require` einbinden.
2. `_scss/main.scss` als Quelldatei auswählen.
3. Sourcemaps initialisieren.
4. sass aufrufen (SCSS in CSS konvertieren).
5. cssnano aufrufen (CSS minifizieren).
6. Sourcemaps schreiben.
7. CSS ins Verzeichnis `css` schreiben, also `css/main.css` erzeugen.

## JavaScript Minification

Erstellen Sie einen Task `scripts`, der die JavaScript-Datei `main.js` im Ordner `_js` minifiziert ("uglified") und das Ergebnis in den Ordner `js` schreibt. Von dort wird die Datei wie gewohnt in der HTML-Datei eingebunden.

Sie benötigen dafür das folgende Gulp-Plugin (Node.js Package):

- [gulp-uglify-es](https://www.npmjs.com/package/gulp-uglify-es).

Folgende Dinge sind zu tun:

1. Das Package mit `require` einbinden.
2. `_js/main.js` oder generischer, alle `.js`-Dateien im Ordner `_js` als Quelldatei(en) auswählen.
3. uglify-es aufrufen.
4. Die minifizierte JavaScript-Datei(en) in den Ordner `js` schreiben (d.h. `js/main.js` erzeugen).

gulp-uglify-es ist ein gulp-Plugin (Wrapper) für das Node.js-Package [terser](https://www.npmjs.com/package/terser). Beim Aufruf von uglify-es kann in den Klammern ein JSON-Objekt zur Konfiguration mitgegeben werden, um die Minification zu steuern. Mögliche Optionen finden sich in der [API Referenz von terser](https://terser.org/docs/api-reference). Probieren Sie z.B. das Aktivieren der Top-Level-Kompression durch Angabe von `{ toplevel: true }` und vergleichen Sie den unterschiedlichen Output in der minifizierten JavaScript-Datei.

## Browsersync mit Watch-Task

Erstellen Sie einen Task `server`, der Browsersync startet. Erstellen Sie weiters einen Task `watcher`, der ihre `_scss`- und `_js`-Ordner  sowie die Datei `index.html` überwacht und bei Änderungen die Tasks `styles` bzw. `scripts` sowie einen internen Task `reload`, der Browsersync anweist einen Reload durchzuführen, ausführt.

Erstellen Sie schließlich noch den Task `default`, der die Tasks `styles`, `scripts`, `server` und `watch` ausführt und somit eine toolgestützte Entwicklung ermöglicht.

Sie benötigen dafür das folgende Node.js Package:

- [browser-sync](https://www.npmjs.com/package/browser-sync).

Folgende Dinge sind zu tun:

1. Das Package mit `require` einbinden. Für das gulp-Objekt die Eigenschaften `watch`, `series` und `parallel` per Object-Destructuring verfügbar machen.
2. Beim Task `server` browser-sync im aktuellen Verzeichnis aufrufen.
3. Beim Task `reload` einen Reload von browser-sync durchführen.
4. Beim Task `watcher` die Dateien in den Verzeichnissen `_css`, `_js` und die Datei `index.html` beobachten und die jeweiligen Tasks aufrufen (`styles`, `scripts`, `reload`).
5. Beim Task `default` alle vorigen Tasks in der richtigen Reihenfolge aufrufen. Wo notwendig, `series` verwenden, um eine sequentielle Abarbeitung zu erzwingen. Wo möglich `parallel` verwenden, um eine gleichzeitige Ausführung zu bewirken.

## JavaScript-Linting

Erstellen Sie einen Task `lint`, der ihre JavaScript-Dateien auf syntaktische Korrektheit überprüft und allfällige Fehler ausgibt.

Sie benötigen dafür das folgende Gulp-Plugin (Node.js Package):

- [gulp-eslint](https://www.npmjs.com/package/gulp-eslint).

Folgende Dinge sind zu tun:

1. Das Package mit `require` einbinden.
2. `_js/main.js` oder generischer, alle `.js`-Dateien im Ordner `_js` als Quelldatei(en) auswählen.
3. eslint aufrufen.
4. Fehler mit eslint.format() ausgeben.
5. Ggf. eslint.failAfterError() die Verarbeitung abbrechen lassen, falls das Linting etwa im Default-Task eingebunden wird.
6. Eine Datei `.eslintrc` erstellen, welche die Regeln für das Linting beinhaltet.

## Weitere mögliche Plugins

Sie möchten weiter mit gulp und möglichen Plugins experimentieren? Folgende Plugins können in derartigen Workflows praktisch sein:

- [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint): Ein CSS-Linter. Überprüft CSS-Dateien auf syntaktische Korrektheit.
- [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin): Ein HTML-Minifier.
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin): Minifiziert PNG, JPEG, GIF und SVG-Bilder.
- [gulp-rename](https://www.npmjs.com/package/gulp-rename): Ermöglicht es, Dateien in der Pipeline umzubenennen.

## Was kommt ins Git-Repository?

Möchten Sie, dass andere Personen bzw. Sie selbst auf einem anderen Gerät ebenfalls den Gulp-Development-Workflow nützen können, müssen Sie dafür sorgen, dass alle relevanten Dateien im Git-Repository eingecheckt sind.

Dies ist zunächst alles, was zur Webseite gehört, so wie es bereits enthalten ist:

- `index.html`,
- der Ordner `_scss` mit allen Dateien darin,
- der Ordner `_js` mit allen Dateien darin.

Sie können die Ordner `css` und `js` mit den fertig minifizierten Dateien ebenfalls committen. In diesem Fall enthält das Repository dann die komplette, funktionsfähige Webseite. Allerdings müssen Sie dann bei Änderungen der Quelldateien (in `_scss` und `_js`) auch jedes Mal die veränderten minifizierten CSS- und JS-Dateien (das Build-Ergebnis) mitcommiten, um konsistent zu bleiben.

Falls Sie nur die Quelldateien im Repository behalten möchten, fügen Sie `css` und `js` zu ihrer `.gitignore`-Datei hinzu, um die Dateien darin auszuschließen. In diesem Fall beinhaltet das Repository nur die Quelldateien und man ist gezwungen, nach dem Clonen zunächst den Build-Prozess auszuführen, um eine funktionierende Webseite zu erhalten. Beide Varianten sind möglich und gängig.

Um die gulp-Tasks mit allen beteiligten Node.js-Packages verfügbar zu machen, müssen die folgenden drei Dateien ebenfalls committed werden:

- `Gulpfile.js`,
- `package.json`,
- `package-lock.json`.

Der Ordner `node_modules` muss und *soll nicht* committed werden. Die Datei `.gitignore` sollte dies aber ohnehin verhindern. Ist `package.json` vorhanden, so reicht die Ausführung von `npm install` um alle darin gegebenen Node.js Module zu installieren (dadurch wird das Verzeichnis `node_modules` angelegt und alle Module werden heruntergeladen).

## Tipps

- Die Coding Assistance für Node.js kann in PhpStorm wie folgt aktiviert werden: `File -> Settings -> Languages & Frameworks -> Node.js -> Coding assistance for Node.js`.
