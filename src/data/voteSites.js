/**
 * Static config for each voting site.
 * buildUrl(userId) returns the topsite URL with the player's ID embedded as
 * the callback parameter so the topsite can credit the right account.
 */
const VOTE_SITES = [
  {
    id:       'RUNELOCUS',
    name:     'RuneLocus',
    tagline:  'Top 100 RSPS Network',
    icon:     '👑',
    buildUrl: (userId) =>
      `https://www.runelocus.com/top-rsps-list/near-reality-is-back/vote?callback=${userId}`,
    rewards:  ['2 Vote Points', '2× Tome of Experience', '150,000 Coins'],
  },
  {
    id:       'RSPS_LIST',
    name:     'RSPS List',
    tagline:  'RS Private Server Rankings',
    icon:     '📜',
    buildUrl: (userId) =>
      `https://www.rsps-list.com/index.php?a=in&u=nrpk&id=${userId}`,
    rewards:  ['2 Vote Points', '2× Tome of Experience', '75,000 Coins'],
  },
];

export default VOTE_SITES;
