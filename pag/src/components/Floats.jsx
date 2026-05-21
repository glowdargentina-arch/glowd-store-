function Floats({ theme }) {
  const dark = theme === 'dark';
  const [hint, setHint] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setHint(false), 6000);
    return () => clearTimeout(t);
  }, []);
  const msg = encodeURIComponent('Hola GLOWD 👋 quiero consultar por un iPhone.');
  return (
    <div className="no-print fixed bottom-5 right-5 md:bottom-7 md:right-7 z-30 flex items-center gap-3">
      {hint && (
        <div className={"hidden sm:block px-4 py-2.5 rounded-2xl shadow-lg text-[13px] leading-tight " +
          (dark ? 'bg-white text-black' : 'bg-black text-white')}>
          <div className="font-medium">Hablá con nosotros</div>
          <div className="opacity-70 text-[11px]">Respondemos en minutos</div>
        </div>
      )}
      <a
        href={`https://wa.me/5493425174996?text=${msg}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp"
        className={"wa-pulse relative h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 " +
          (dark ? 'bg-white text-black' : 'bg-black text-white')}>
        <Icon.Whatsapp className="w-7 h-7 md:w-8 md:h-8"/>
      </a>
    </div>
  );
}

window.Floats = Floats;
