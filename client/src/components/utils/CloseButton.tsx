function CloseButton({ close }: { close: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close"
      className="bg-close bg-contain bg-center bg-no-repeat min-h-[16px] min-w-[16px]"
      onClick={close}
    />
  );
}

export default CloseButton;
