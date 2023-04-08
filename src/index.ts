import * as fs from 'fs-extra';
import * as path from 'path';
import { SourceMapConsumer } from 'source-map';

/**
 * Convert source map files to source files.
 * @param {string} sourceMapPath - The path of the source map file.
 * @param {string} outputPath - The path where the source files will be saved.
 * @param {(message: string) => void} [logger] - An optional logger function for custom logging.
 * @example
 * // Path to the source map file
 * const sourceMapPath = './path/to/your/source-map.js.map';
 * 
 * // Path to the output directory where the source files will be saved
 * const outputPath = './path/to/output/directory';
 * 
 * // (Optional) Custom logging function
 * const logger = (message) => {
 *   console.log(`[Custom Logger]: ${message}`);
 * };
 * 
 * // Convert the source map to source files
 * convertSourceMapToSource(sourceMapPath, outputPath, logger)
 *   .then(() => console.log('Conversion completed.'))
 *   .catch((error) => console.error('An error occurred:', error));
 */
async function convertSourceMapToSource(sourceMapPath: string, outputPath: string, logger = console.log) {
  try {
    // Read the source map file
    const rawData = await fs.readFile(sourceMapPath, 'utf8');
    const sourceMapData = JSON.parse(rawData);

    // Process the source map data
    await SourceMapConsumer.with(sourceMapData, null, async (consumer) => {
      const sources = consumer.sources;
      for (const source of sources) {
        const sourceContent = consumer.sourceContentFor(source);
        if (sourceContent) {
          // Create the target file path and save the source content
          const targetPath = path.join(outputPath, source);
          await fs.outputFile(targetPath, sourceContent, 'utf8');
          logger(`Saved source file: ${targetPath}`);
        }
      }
    });
  } catch (error) {
    logger(`Error: ${error.message}`);
  }
}

export { convertSourceMapToSource };
