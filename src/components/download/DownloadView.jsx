const RELEASES_BASE = 'https://github.com/tamerab1/zelus-server/releases/latest/download';

const PLATFORMS = [
  {
    id:       'windows',
    label:    'Windows',
    badge:    'Windows 10 / 11',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
      </svg>
    ),
    file:     'ZelusLauncher-windows.zip',
    note:     'Extract the ZIP and run ZelusLauncher.exe — no Java required.',
    comingSoon: false,
  },
  {
    id:       'mac',
    label:    'macOS',
    badge:    'macOS 11+',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-.5 2.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3 5.5c-.8 1.2-1 2.5-.5 3.8.5 1.2 1.5 2 2.7 2.1-.4-.5-.7-1.1-.8-1.8-.2-1.4.5-2.8 1.6-3.6-.9-.2-2-.1-3 .5zm6 0c-1 .6-1.7 1.6-1.8 2.7-.1 1 .2 2 .9 2.7.8-.8 1.3-1.9 1.3-3.1 0-.8-.2-1.6-.4-2.3z"/>
      </svg>
    ),
    file:     'ZelusLauncher-mac.dmg',
    note:     'Open the DMG and drag ZelusLauncher to Applications.',
    comingSoon: false,
  },
  {
    id:       'linux',
    label:    'Linux',
    badge:    'Ubuntu / Debian',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489.117.779.567 1.562 1.041 2.179.433.563.945 1.117 1.415 1.721.135.172.16.514.234.79-.21.26-.272.375-.396.5-.133.137-.326.329-.512.606-.186.278-.349.612-.368.997-.02.394.115.829.41 1.102.295.274.715.394 1.145.416a3.298 3.298 0 0 0 1.606-.378c.636-.336 1.207-.826 1.661-1.387.454-.562.777-1.175.897-1.787.12-.612.063-1.225-.197-1.769-.26-.544-.694-1.023-1.198-1.432-.505-.408-1.079-.761-1.597-1.181-.519-.42-.978-.926-1.259-1.534-.281-.607-.355-1.322-.121-1.99.234-.668.72-1.238 1.277-1.773.558-.534 1.189-1.02 1.773-1.604.584-.583 1.12-1.265 1.41-2.103.289-.838.31-1.823.024-2.703-.284-.882-.856-1.668-1.579-2.267-.723-.599-1.607-1.013-2.564-1.204-.489-.096-1.003-.14-1.516-.138zm.991 2.001c.491.001.974.078 1.417.235.888.314 1.598.977 1.973 1.775.375.798.404 1.735.131 2.538-.273.803-.799 1.455-1.448 2.008-.649.553-1.414 1.001-2.151 1.497-.737.496-1.447 1.054-1.948 1.799-.501.745-.75 1.665-.577 2.584.173.92.697 1.748 1.345 2.412.648.665 1.418 1.216 2.102 1.843.683.628 1.258 1.347 1.437 2.15.18.802.016 1.67-.392 2.406-.409.736-1.061 1.329-1.784 1.747-.724.418-1.52.639-2.327.641-.406 0-.812-.052-1.2-.177-.389-.126-.754-.328-1.048-.602-.294-.274-.513-.626-.603-1.005-.09-.38-.054-.775.066-1.115.12-.34.322-.635.545-.872.223-.238.466-.417.69-.568l.048-.031c.198-.132.378-.257.538-.396.159-.139.295-.296.352-.468.056-.172.025-.363-.124-.554-.149-.191-.388-.36-.651-.522-.263-.162-.549-.317-.812-.487-.263-.17-.496-.357-.655-.581-.159-.223-.238-.487-.146-.783.093-.296.345-.589.656-.829.311-.24.673-.423 1.007-.526.334-.103.643-.124.91-.064.267.059.49.19.678.367.188.177.339.397.447.647.107.25.168.528.152.827-.016.299-.117.617-.325.916-.208.299-.524.566-.927.762-.402.196-.892.327-1.419.31-.528-.017-1.076-.19-1.543-.507-.467-.317-.842-.772-1.01-1.32-.168-.548-.127-1.178.094-1.751.221-.573.606-1.083 1.078-1.5.472-.418 1.033-.748 1.608-1.012.575-.264 1.163-.462 1.713-.7.55-.238 1.06-.517 1.455-.893.396-.376.676-.84.773-1.386.097-.546.01-1.157-.242-1.717-.252-.56-.658-1.068-1.155-1.461-.497-.393-1.084-.673-1.71-.806-.313-.066-.636-.093-.953-.083z"/>
      </svg>
    ),
    file:     'ZelusLauncher-linux.deb',
    note:     'Install with: sudo dpkg -i ZelusLauncher-linux.deb',
    comingSoon: false,
  },
];

function PlatformCard({ platform }) {
  const { label, badge, icon, file, note, comingSoon } = platform;
  const url = `${RELEASES_BASE}/${file}`;

  return (
    <div style={{
      background:   'linear-gradient(180deg, rgba(30,25,15,0.95) 0%, rgba(18,15,8,0.98) 100%)',
      border:       '1px solid rgba(212,175,55,0.2)',
      boxShadow:    '0 4px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
      padding:      '40px 32px',
      display:      'flex',
      flexDirection:'column',
      alignItems:   'center',
      gap:          '20px',
      position:     'relative',
      overflow:     'hidden',
    }}>
      {/* Corner accents */}
      <div style={{ position:'absolute', top:0, left:0, width:24, height:24,
        borderTop:'1px solid rgba(212,175,55,0.4)', borderLeft:'1px solid rgba(212,175,55,0.4)' }} />
      <div style={{ position:'absolute', top:0, right:0, width:24, height:24,
        borderTop:'1px solid rgba(212,175,55,0.4)', borderRight:'1px solid rgba(212,175,55,0.4)' }} />
      <div style={{ position:'absolute', bottom:0, left:0, width:24, height:24,
        borderBottom:'1px solid rgba(212,175,55,0.4)', borderLeft:'1px solid rgba(212,175,55,0.4)' }} />
      <div style={{ position:'absolute', bottom:0, right:0, width:24, height:24,
        borderBottom:'1px solid rgba(212,175,55,0.4)', borderRight:'1px solid rgba(212,175,55,0.4)' }} />

      {/* OS icon */}
      <div style={{ color: '#d4af37', opacity: comingSoon ? 0.4 : 0.9,
        filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.3))' }}>
        {icon}
      </div>

      {/* Labels */}
      <div style={{ textAlign:'center' }}>
        <div className="font-fantasy" style={{ fontSize:22, color:'#f0d060',
          letterSpacing:'0.15em', textShadow:'0 0 16px rgba(212,175,55,0.5)',
          marginBottom:6 }}>
          {label}
        </div>
        <div style={{ fontSize:11, color:'#6b6040', letterSpacing:'0.12em', fontFamily:'monospace' }}>
          {badge}
        </div>
      </div>

      {/* Note */}
      <p style={{ fontSize:12, color:'#8a8070', textAlign:'center', lineHeight:1.7,
        maxWidth:220, minHeight:38 }}>
        {comingSoon ? 'Coming soon — check back for the release.' : note}
      </p>

      {/* Button */}
      {comingSoon ? (
        <div className="font-fantasy" style={{
          padding:'10px 32px', fontSize:11, letterSpacing:'0.2em',
          color:'#4a4030', border:'1px solid rgba(212,175,55,0.1)',
          cursor:'default',
        }}>
          COMING SOON
        </div>
      ) : (
        <a
          href={url}
          download
          className="font-fantasy"
          style={{
            display:'inline-block', padding:'12px 36px',
            background:'linear-gradient(180deg, #2e2410 0%, #1a1408 100%)',
            border:'1px solid rgba(212,175,55,0.6)',
            color:'#d4af37', fontSize:11, letterSpacing:'0.22em',
            textDecoration:'none',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.08)',
            transition:'all 0.15s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = '#d4af37';
            e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.6), 0 0 32px rgba(212,175,55,0.2)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)';
            e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.08)';
          }}
        >
          DOWNLOAD
        </a>
      )}
    </div>
  );
}

export default function DownloadView() {
  return (
    <div style={{ minHeight:'100vh', paddingBottom:80 }}>

      {/* ── Hero ── */}
      <div style={{
        textAlign:'center', padding:'72px 24px 48px',
        background:'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 100%)',
        borderBottom:'1px solid rgba(212,175,55,0.1)',
        marginBottom:64,
      }}>
        {/* Divider line top */}
        <div style={{ width:120, height:1, margin:'0 auto 32px',
          background:'linear-gradient(90deg,transparent,#d4af37,transparent)' }} />

        <h1 className="font-fantasy" style={{
          fontSize:'clamp(28px,5vw,48px)', letterSpacing:'0.2em',
          color:'#f0d060', textShadow:'0 0 40px rgba(212,175,55,0.5)',
          marginBottom:16,
        }}>
          DOWNLOAD ZELUS
        </h1>
        <p style={{ color:'#8a8070', fontSize:13, letterSpacing:'0.1em',
          maxWidth:500, margin:'0 auto 32px', lineHeight:1.8 }}>
          The Zelus launcher automatically keeps your client up to date.
          Download once, play forever.
        </p>

        {/* Divider line bottom */}
        <div style={{ width:80, height:1, margin:'0 auto',
          background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent)' }} />
      </div>

      {/* ── Platform cards ── */}
      <div style={{
        maxWidth:960, margin:'0 auto', padding:'0 24px',
        display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',
        gap:24, marginBottom:72,
      }}>
        {PLATFORMS.map(p => <PlatformCard key={p.id} platform={p} />)}
      </div>

      {/* ── How it works ── */}
      <div style={{ maxWidth:700, margin:'0 auto', padding:'0 24px' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div className="font-fantasy" style={{ fontSize:16, letterSpacing:'0.2em',
            color:'#d4af37', marginBottom:8 }}>
            HOW IT WORKS
          </div>
          <div style={{ width:60, height:1, margin:'0 auto',
            background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent)' }} />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:24 }}>
          {[
            { n:'1', title:'Download',   body:'Get the launcher for your OS above.' },
            { n:'2', title:'Install',    body:'Run the installer or extract the ZIP.' },
            { n:'3', title:'Play',       body:'The launcher downloads the client and connects automatically.' },
          ].map(({ n, title, body }) => (
            <div key={n} style={{ textAlign:'center', padding:'24px 16px',
              background:'rgba(18,15,8,0.6)', border:'1px solid rgba(212,175,55,0.1)' }}>
              <div className="font-fantasy" style={{ fontSize:28, color:'rgba(212,175,55,0.3)',
                marginBottom:8 }}>{n}</div>
              <div className="font-fantasy" style={{ fontSize:12, letterSpacing:'0.18em',
                color:'#d4af37', marginBottom:8 }}>{title.toUpperCase()}</div>
              <div style={{ fontSize:12, color:'#6b6040', lineHeight:1.7 }}>{body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
