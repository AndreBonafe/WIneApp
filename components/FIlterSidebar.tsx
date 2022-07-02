import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  @media (max-width: 414px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: #f6f6f6;
    padding: 10px;
  
    label {
      padding: 2%;
      display: flex;
      justify-content: center;
      font-size: 16px;
    }
  }
  @media (min-width: 415px) {
    display: flex;
    flex-direction: column;
    background-color: #f6f6f6;
    padding: 0 0 0 45px;

    label {
      display: flex;
      font-size: 16px;
      padding: 0 0 15px 25px;
    }
    h3 {
      padding: 0 0 0 25px;
    }
  }

  input {
    display: flex;
    justify-content: center;
    appearance: none;
    background-color: #fff;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;
  }
  
  input:checked {
    display: flex;
    justify-content: center;
    appearance: none;
    background-color: #f79552;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;
  }
`;

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  align-self: center;
  background-color: #f5f5f5;
  font-size: 16px;
  margin-top: 5px;
  border: none;
  box-shadow: 2px 1px 5px 0px #DADADA;
  border-radius: 10%;
  color: #f79552;
  font-weight: bold;
  @media (min-width: 415px) {
    width: 100%;
    align-self: flex-start;
  }
`;

const FilterSideBar = 
({ setter }: { setter: Dispatch<React.SetStateAction<string>> }) => {

  const [showSelect, setShowSelect] = useState(false);

  const onClickFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
    localStorage.setItem('selectedFilter', event.target.value);
  };

  const selectedFilter = localStorage.getItem('selectedFilter');

  return (
    <StyledSidebar>
      { window.innerWidth <= 414 && (
        <StyledButton onClick={() => setShowSelect(!showSelect)}>
          Refine sua busca
        </StyledButton>
      )}
      { window.innerWidth <= 414
        ? ( showSelect && (
          <StyledSection>
            <label htmlFor="40"> 
              <input type="radio" value="0-40" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '0-40'} />
            Até R$40 </label>

            <label htmlFor="60"> 
              <input type="radio" value="40-60" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '40-60'} />
            R$40 A R$60 </label>

            <label htmlFor="100"> 
              <input type="radio" value="60-100" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '60-100'} />
            R$60 A R$100 </label>

            <label htmlFor="200"> 
              <input type="radio" value="100-200" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '100-200'} />
            R$100 A R$200 </label>

            <label htmlFor="500"> 
              <input type="radio" value="200-500" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '200-500'} />
            R$200 A R$500 </label>

            <label htmlFor="501"> 
              <input type="radio" value="500-1000" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '500-1000'} />
            Acima de R$500 </label>

            <StyledButton type="button" value="" name="filteropt" 
              onClick={(event: React.FormEvent<HTMLButtonElement>) => {
                setter('');
                localStorage.setItem('selectedFilter', '');
                window.location.reload();
              }}>
                REMOVER FILTRO
            </StyledButton>
          </StyledSection>
        )) : (
          <StyledSection>
            <h3>
              Refine sua busca
            </h3>
            <label htmlFor="40"> 
              <input type="radio" value="0-40" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '0-40'} />
            Até R$40 </label>

            <label htmlFor="60"> 
              <input type="radio" value="40-60" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '40-60'} />
            R$40 A R$60 </label>

            <label htmlFor="100">
              <input type="radio" value="60-100" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '60-100'} />
            R$60 A R$100 </label>
            
            <label htmlFor="200"> 
              <input type="radio" value="100-200" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '100-200'} />
            R$100 A R$200 </label>

            <label htmlFor="500"> 
              <input type="radio" value="200-500" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '200-500'} />
            R$200 A R$500  </label>
            <label htmlFor="501"> 
              <input type="radio" value="500-1000" name="filteropt" 
                onChange={(event) => onClickFunc(event)}
                defaultChecked={selectedFilter === '500-1000'} />
            Acima de R$500 </label>

            <StyledButton type="button" value="" name="filteropt" 
              onClick={(event: React.FormEvent<HTMLButtonElement>) => {
                setter('');
                localStorage.setItem('selectedFilter', '');
                window.location.reload();
              }}>
                REMOVER FILTRO
            </StyledButton>

          </StyledSection>
        )}
    </StyledSidebar>
  );
};

export default FilterSideBar;