import React, { Dispatch } from 'react';

const FilterSideBar = 
({ setter }: { setter: Dispatch<React.SetStateAction<string>> }) => {

  const onClickFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
    localStorage.setItem('selectedFilter', event.target.value);
  };

  const selectedFilter = localStorage.getItem('selectedFilter');

  return (
    <div>
      <section id="widget_1">
        <h3>
          Refine sua busca
        </h3>
      </section>
      <section id="widget_2">

        <input type="radio" value="0-40" name="filteropt" 
          onChange={(event) => onClickFunc(event)}
          defaultChecked={selectedFilter === '0-40'} />
        <label htmlFor="40"> Até R$40 </label>

        <input type="radio" value="40-60" name="filteropt" 
          onChange={(event) => onClickFunc(event)}
          defaultChecked={selectedFilter === '40-60'} />
        <label htmlFor="60"> R$40 A R$60 </label>

        <input type="radio" value="60-100" name="filteropt" 
          onChange={(event) => onClickFunc(event)}
          defaultChecked={selectedFilter === '60-100'} />
        <label htmlFor="100"> R$60 A R$100 </label>

        <input type="radio" value="100-200" name="filteropt" 
          onChange={(event) => onClickFunc(event)}
          defaultChecked={selectedFilter === '100-200'} />
        <label htmlFor="200"> R$100 A R$200 </label>

        <input type="radio" value="200-500" name="filteropt" 
          onChange={(event) => onClickFunc(event)}
          defaultChecked={selectedFilter === '200-500'} />
        <label htmlFor="500"> R$200 A R$500 </label>

        <input type="radio" value="500-1000" name="filteropt" 
          onChange={(event) => onClickFunc(event)}
          defaultChecked={selectedFilter === '500-1000'} />
        <label htmlFor="501"> Acima de R$500 </label>

        <button type="button" value="" name="filteropt" 
          onClick={(event: React.FormEvent<HTMLButtonElement>) => {
            setter('');
            localStorage.setItem('selectedFilter', '');
            window.location.reload();
          }}>
            REMOVER FILTRO
        </button>

      </section>
    </div>
  );
};

export default FilterSideBar;