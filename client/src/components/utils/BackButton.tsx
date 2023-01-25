function BackButton({ close }: { close: () => void }) {
  return (
    <button
      type="button"
      onClick={close}
      className="bg-back mr-3 bg-contain bg-center bg-no-repeat w-[21px]"
      aria-label="Back"
    />
  );
}

export default BackButton;
