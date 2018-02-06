module.exports = {
  updateVersion: (currentVersion, type='patch') => {
    let prefix  = currentVersion.match(/\w.+-v?/)[0];
    let version = currentVersion.match(/\d{1,}\.\d{1,}\.\d{1,}/)[0].split('.').map((n) => Number(n));

    switch (type){
      case 'major': 
        version[0]++
        break; 
      case 'minor':
        version[1]++;
        break;
      default:
        version[version.length-1]++
        break;
    }
    return `${prefix}${version.join('.')}`;
  }
}