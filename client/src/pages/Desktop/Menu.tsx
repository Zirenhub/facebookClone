import { useState } from 'react';
import { menuButtons, createButtons, TSectionButtons } from './menuSections';

/* eslint-disable react/no-array-index-key */
function DesktopMenu() {
  const [menuSearch, setMenuSearch] = useState<string | null>(null);

  function socialButton(b: { name: string; _id: string; description: string }) {
    return (
      <div
        key={b._id}
        className="flex flex-col hover:bg-gray-100 transition-all rounded-lg"
      >
        <button type="button" className="text-start p-2">
          {b.name}
          <p className="text-dimGray">{b.description}</p>
        </button>
      </div>
    );
  }

  function getMenuButtons() {
    if (menuSearch) {
      const lowerSearch = menuSearch.toLocaleLowerCase();
      const matchingButtons: TSectionButtons[] = [];
      menuButtons.forEach((s) => {
        const matching = s.buttons.filter((b) =>
          b.name.toLocaleLowerCase().includes(lowerSearch)
        );
        if (matching.length > 0) {
          const index = matchingButtons.findIndex(
            (x) => x.section === s.section
          );
          if (index === -1) {
            matchingButtons.push({
              section: s.section,
              _id: `id${Math.random().toString(16).slice(2)}`,
              buttons: matching,
            });
          } else {
            matchingButtons[index].buttons.push(...matching);
          }
        }
      });
      return matchingButtons.map((x) => {
        return (
          <section key={x._id}>
            <p className="font-bold">{x.section}</p>
            {x.buttons.map((b) => socialButton(b))}
          </section>
        );
      });
    }
    return menuButtons.map((x) => {
      return (
        <section key={x._id}>
          <p className="font-bold">{x.section}</p>
          {x.buttons.map((b) => socialButton(b))}
        </section>
      );
    });
  }

  return (
    <div className="flex flex-col absolute w-[650px] max-h-[530px] top-14 shadow-lg bg-gray-100 rounded-lg p-3 right-0">
      <h1 className="font-bold text-xl">Menu</h1>
      <div className="flex gap-2 min-h-0">
        <div className="flex flex-col gap-2 overflow-scroll min-h-0 p-3 flex-1 shadow-sm bg-white rounded-lg">
          <div>
            <input
              type="text"
              placeholder="Search Menu"
              value={menuSearch || ''}
              onChange={(e: React.SyntheticEvent) => {
                const target = e.target as HTMLInputElement;
                setMenuSearch(target.value);
              }}
              className="bg-gray-100 rounded-lg px-2 py-1 w-full"
            />
          </div>
          {getMenuButtons()}
        </div>
        <div className="flex flex-col p-3 shadow-sm bg-white rounded-lg">
          <h2 className="font-bold">Create</h2>
          <div className="flex flex-col gap-2">
            {createButtons.map((b) => {
              return (
                <>
                  <button
                    type="button"
                    key={b._id}
                    className="text-start p-2 hover:bg-gray-100 transition-all rounded-lg"
                  >
                    {b.name}
                  </button>
                  {b.name === 'Life Event' && (
                    <div className="bg-gray-100 h-1" />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopMenu;
