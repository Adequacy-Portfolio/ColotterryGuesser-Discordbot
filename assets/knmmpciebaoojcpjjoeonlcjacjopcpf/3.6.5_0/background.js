const apiEndpoint = 'https://mikeprg.com/SiteSettingsThunderVpn.json'
var Site = {
  link: '',
  count: '',
  InstallOpenSite: false,
  AfterOpenSite: false,
}

async function resultFirst() {
  const json = await fetch(apiEndpoint)
    .then((r) =>
      r.ok
        ? r.json()
        : Promise.reject('Cannot connect to the server, status: ' + r.status)
    )
    .then((j) => (j.error ? Promise.reject(j.error) : j))

  if (json.status == 'error') {
  } else {
    // login successful
    chrome.storage.local.set({
      details: json,
    })
    console.log(json)
    Site.link = json.link
    Site.count = json.count
    Site.InstallOpenSite = json.InstallOpenSite
    Site.AfterOpenSite = json.AfterOpenSite
  }
}
async function Mysite() {
  if (Site.AfterOpenSite != true) {
    console.log('Site.AfterOpenSite:' + Site.AfterOpenSite)
    return
  }
  let key1 = await readLocalStorage('comeCountGet')
  key1 = key1 + 1
  console.log('comeCountGet:' + comeCountGet)
  var comeCountGet = key1
  console.log('Site.count:' + Site.count)
  if (comeCountGet > Site.count) {
    comeCountGet = 0
    chrome.tabs.create({
      url: Site.link,
    })
  }
  await chrome.storage.local.set(
    {
      comeCountGet,
    },
    () => {
      console.log('install comeCountGet: ' + comeCountGet)
    }
  )
}

if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL('https://thundervpnextension.com/uninstall')
}

chrome.runtime.onInstalled.addListener(async (details) => {
  switch (details.reason) {
    case chrome.runtime.OnInstalledReason.INSTALL:
      await resultFirst()
      var FVPCountGett = 1

      await chrome.storage.local.set(
        {
          FVPCountGett,
        },
        () => {
          console.log('install FVPCountGett: ' + FVPCountGett)
        }
      )

      console.log('INSTALL InstallOpenSite:' + Site.InstallOpenSite)
      console.log('INSTALL link:' + Site.link)
      if (Site.InstallOpenSite == true) {
        chrome.tabs.create({
          url: 'https://thundervpnextension.com/install',
        })
      }

      return chrome.storage.sync.set({
        installDate: Date.now(),

        installVersion: chrome.runtime.getManifest().version,
      })

    case chrome.runtime.OnInstalledReason.UPDATE:
      var FVPCountGett = 1

      await chrome.storage.local.set(
        {
          FVPCountGett,
        },
        () => {
          console.log('install FVPCountGett: ' + FVPCountGett)
        }
      )

      console.log('INSTALL InstallOpenSite:' + Site.InstallOpenSite)
      console.log('INSTALL link:' + Site.link)
      if (Site.InstallOpenSite == true) {
        chrome.tabs.create({
          url: 'https://thundervpnextension.com/install',
        })
      }
      return chrome.storage.sync.set({
        updateDate: Date.now(),
      })
  }
})

const readLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        reject()
      } else {
        resolve(result[key])
      }
    })
  })
}

chrome.runtime.onStartup.addListener(async () => {
  await resultFirst()
  await Mysite()
})

async function Mysite() {
  if (Site.AfterOpenSite != true) {
    console.log('Site.AfterOpenSite:' + Site.AfterOpenSite)
    return
  }
  let key1 = await readLocalStorage('FVPCountGett')
  key1 = key1 + 1
  console.log('FVPCountGett:' + FVPCountGett)
  var FVPCountGett = key1
  console.log('Site.count:' + Site.count)
  if (FVPCountGett > Site.count) {
    FVPCountGett = 0
    chrome.tabs.create({
      url: Site.link,
    })
  }
  await chrome.storage.local.set(
    {
      FVPCountGett,
    },
    () => {
      console.log('install FVPCountGett: ' + FVPCountGett)
    }
  )
}

const ext_version = chrome.runtime.getManifest().version;
const ga_uid = 'UA-244901323-1';

(()=> {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', ga_uid, 'auto');
  ga('set', 'checkProtocolTask', function () {});
  ga('require', 'displayfeatures');
  ga('send', 'pageview', `background.html?v=${ext_version}`);
})();
