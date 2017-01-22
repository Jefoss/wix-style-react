const buildIcons = require('./build-icons');
jest.mock('fs');
jest.mock('svgo');
jest.mock('glob');
jest.mock('rimraf');
jest.mock('./svg-optimizer');
jest.mock('esformatter');

describe('Build icons', () => {
  let rimrafMock, fsMock, globMock, optimizerMock, esformatterMock;
  beforeEach(() => {
    fsMock = require('fs');
    globMock = require('glob');
    rimrafMock = require('rimraf');
    optimizerMock = require('./svg-optimizer');
    esformatterMock = require('esformatter');
  });

  beforeEach(() => {
    optimizerMock.mockImplementation(content => {
      return new Promise(resolve => {
        resolve({data: content});
      })
    });

    esformatterMock.format.mockImplementation(obj => obj);
  });

  afterEach(() => {
    // no unexpected file should be written
    expect(fsMock.writeFileSync).not.toHaveBeenCalled();
  });

  const withSvgFiles = svgFiles => {
    fsMock.readFileSync.mockImplementation(fileName => {
      const foundFiles = svgFiles.filter(file => file.name === fileName);

      if (foundFiles.length > 0) {
        return foundFiles[0].raw;
      }

      throw 'File not found!';
    });

    globMock.mockImplementation((globFilter, handler) => {
      const fileNames = svgFiles.map(file => file.name);
      handler(null, fileNames);
    });
  };

  const expectIconFiles = svgFiles => {
    const totalFileWriteCount = svgFiles.length + 1;
    let exports = '';
    expect(esformatterMock.format.mock.calls.length).toEqual(svgFiles.length);
    expect(optimizerMock.mock.calls.length).toEqual(svgFiles.length);
    expect(fsMock.writeFileSync.mock.calls.length).toEqual(totalFileWriteCount);

    svgFiles.forEach((val, index) => {
      const regexp = new RegExp(`.*\/components\/${val.name}\.js`);
      expect(fsMock.writeFileSync.mock.calls[index][0]).toMatch(regexp);
      expect(fsMock.writeFileSync.mock.calls[index][1]).toMatch(val.expected);
      exports += `export {default as ${val.name}} from \'./components/${val.name}\';\n`;
    });

    expect(fsMock.writeFileSync.mock.calls[totalFileWriteCount - 1][0]).toMatch(/.*\/Icons\/index\.js$/);
    expect(fsMock.writeFileSync.mock.calls[totalFileWriteCount - 1][1]).toEqual(exports);
    fsMock.writeFileSync.mockReset();
  };

  it('should clean previous output dir', () => {
    withSvgFiles([]);
    buildIcons();

    expect(rimrafMock.sync.mock.calls[0][0]).toMatch(/.*\/components$/);
    expect(fsMock.mkdirSync.mock.calls[0][0]).toMatch(/.*\/components$/);
  });

  it('should create a simple svg component', () => {
    const file1 = {
      name: 'Icon1',
      raw: '<svg><g></g></svg>',
      expected: /export default Icon1;/
    };
    const svgFiles = [file1];
    withSvgFiles(svgFiles);

    return buildIcons().then(() => {
      expectIconFiles(svgFiles);
    });
  });
});
