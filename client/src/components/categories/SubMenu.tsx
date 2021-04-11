import React, { useState } from "react";
import "./Categories.css";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";



interface IProps{
    item:{title:string, subNav:{title:string}[]}
}

const SubMenu = ({item}:IProps): JSX.Element => {

  const [subnav, setSubnav] = useState(false);

  const showSubNav = () => setSubnav(!subnav);

  return (
    <div className="containerCategories">
      <div>
        <button className="buttonItem" onClick={showSubNav} value={item.title}>
          {item.title}
          <div className="iconT">
            {subnav ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
        </button>
      </div>
      <div>
        {subnav &&
          item.subNav.map((item: { title: string }, i: number) => {
            return (
              <button key={i} className="claseItem">
                {item.title}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default SubMenu;