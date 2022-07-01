const FilterSideBar = () => {
  return (
    <div>
      <section id="widget_1">
        <h3>
          Refine sua busca
        </h3>
      </section>
      <section id="widget_2">
        <input type="radio" value="to40" name="filteropt" />
        <label htmlFor="to40"> Até R$40 </label>
        <input type="radio" value="40to60" name="filteropt" />
        <label htmlFor="40to60"> R$40 A R$60 </label>
        <input type="radio" value="60to100" name="filteropt" />
        <label htmlFor="60to100"> R$60 A R$100 </label>
        <input type="radio" value="100to200" name="filteropt" />
        <label htmlFor="100to200"> R$100 A R$200 </label>
        <input type="radio" value="200to500" name="filteropt" />
        <label htmlFor="200to500"> R$200 A R$500 </label>
        <input type="radio" value="500beyond" name="filteropt" />
        <label htmlFor="500beyond"> Acima de R$500 </label>
      </section>
    </div>
  );
};

export default FilterSideBar;