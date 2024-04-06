import { FilterType } from '../DataType';

function EachFilter({ content, data, onClickHandler, isActive }: FilterType & {isActive:boolean}) {
  return (
    <div
      className={`line d-flex justify-content-between align-items-center px-0 ${isActive ? 'yellow' : ''}`}
      onClick={onClickHandler}
    >
      <p className="mb-2">{content}</p>
      <span className={`badge-pill badge-secondary mb-2 ${isActive ? 'yellow-bg' : ''}`}>{data.length}</span>
    </div>
  );
}

export default EachFilter;


 