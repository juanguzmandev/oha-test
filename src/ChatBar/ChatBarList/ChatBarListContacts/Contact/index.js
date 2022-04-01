const Contact = ({ name, pic, preview }) => {
  return (
    <li>
      <div className="w-full flex flex-row p-2">
        <div className="w-1/3 flex justify-center">
          <img src={pic} alt="Profile Pic" className="w-14 h-14 rounded-full" />
        </div>
        <div className="w-2/3 flex flex-col pl-1 place-content-center">
          <div className="w-full justify-start">
            <h1 className="mb-1">{name}</h1>
          </div>
          <div className="w-full justify-start">
            <h1 className="truncate text-sm text-gray-600">{preview}</h1>
          </div>
        </div>
      </div>
    </li>
  );
};

export { Contact };
