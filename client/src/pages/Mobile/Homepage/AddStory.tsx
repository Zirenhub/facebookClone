function AddStory() {
  return (
    <div className="flex px-2 py-3 border-b-2 border-t-2">
      <div className="min-h-[150px] flex flex-col rounded-md border-2 border-slate-300 relative">
        <div className="grow bg-gray-200" />
        <button
          type="button"
          className="absolute font-bold top-2/3 text-white bg-blue-400 px-1.5 rounded-full left-2/4 -translate-y-2/4 -translate-x-2/4"
        >
          +
        </button>
        <p className="font-bold px-1 py-3">Add to story</p>
      </div>
    </div>
  );
}

export default AddStory;
