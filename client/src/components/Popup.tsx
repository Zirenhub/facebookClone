function Popup({ msg, close }: { msg: string; close: () => void }) {
  return (
    <div className="absolute flex justify-center items-center top-2/4 left-2/4 z-20 w-full h-full -translate-y-2/4 -translate-x-2/4 bg-slate-100/10">
      <div className="bg-white flex items-center justify-center flex-col max-w-[180px]">
        <button type="button" className="self-end px-3" onClick={close}>
          X
        </button>
        <p className="font-bold p-2 text-center">{msg}</p>
      </div>
    </div>
  );
}

export default Popup;
