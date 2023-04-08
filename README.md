# Source Map to Source Files

A simple library to convert source map files to their original source files.

## Installation

Install the library using npm:

```bash
npm install source-map-to-files
```

Or with Yarn:

```bash
yarn add source-map-to-files
```

## Usage

```javascript
import { convertSourceMapToSource } from 'source-map-to-files';

// Path to the source map file
const sourceMapPath = './path/to/your/source-map.js.map';

// Path to the output directory where the source files will be saved
const outputPath = './path/to/output/directory';

// (Optional) Custom logging function
const logger = (message) => {
  console.log(`[Custom Logger]: ${message}`);
};

// Convert the source map to source files
convertSourceMapToSource(sourceMapPath, outputPath, logger)
  .then(() => console.log('Conversion completed.'))
  .catch((error) => console.error('An error occurred:', error));
```

## API

### `convertSourceMapToSource(sourceMapPath: string, outputPath: string, logger?: (message: string) => void): Promise<void>`

Convert source map files to source files.

- `sourceMapPath` - The path of the source map file.
- `outputPath` - The path where the source files will be saved.
- `logger` - (Optional) An optional logger function for custom logging.

## License

This library is released under the [MIT License](LICENSE).
