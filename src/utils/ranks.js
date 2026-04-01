export const getDonorRank = (spent) => {
  if (spent >= 1000) return { name: 'UBER DONATOR',      color: 'text-purple-400' };
  if (spent >= 500)  return { name: 'MYTHICAL DONATOR',  color: 'text-pink-400'   };
  if (spent >= 250)  return { name: 'LEGENDARY DONATOR', color: 'text-yellow-300' };
  if (spent >= 150)  return { name: 'RESPECTED DONATOR', color: 'text-teal-400'   };
  if (spent >= 100)  return { name: 'EXTREME DONATOR',   color: 'text-red-400'    };
  if (spent >= 50)   return { name: 'EXPANSION DONATOR', color: 'text-blue-400'   };
  if (spent >= 25)   return { name: 'PREMIUM DONATOR',   color: 'text-green-400'  };
  return { name: 'PLAYER', color: 'text-gray-400' };
};

export const isAdmin = (privilege) =>
  ['ADMINISTRATOR', 'DEVELOPER', 'TRUE_DEVELOPER', 'HIDDEN_ADMINISTRATOR'].includes(privilege);

export const rankIcon = (i) => {
  if (i === 0) return '🥇';
  if (i === 1) return '🥈';
  if (i === 2) return '🥉';
  return `#${i + 1}`;
};
