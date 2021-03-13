import { useContext, useEffect, useState } from "react";
import { Card, Button} from 'react-bootstrap'
import { BsBoxArrowDown, BsBoxArrowUp } from 'react-icons/bs'
import { Tree, TreeNode } from 'react-organizational-chart'

import { EproContext } from "../context/EproContext";

interface EproInterface {
  name: string;
  img: string;
  isShowingChildren?: boolean;
  children?: EproInterface[];
}

interface EproStructureProps {
  data: EproInterface;
  first?: boolean;
}

export function OrgChart() {
  const { data, changeIsShowingChildren } = useContext(EproContext);

  function makeCard(cardData: EproInterface) {
    return(
      <div>
        <Card style={{ width: '12rem', display: 'inline-block' }}>
          <Card.Img variant="top" src={cardData.img} />
          <Card.Body>
            <Card.Title>{cardData.name}</Card.Title>
            <Card.Text>
              Some quick example
            </Card.Text>
            { typeof(cardData.children) !== 'undefined' && (
              <Button 
                onClick={changeIsShowingChildren}
                data-key={cardData.name}
                size="sm" 
                variant={cardData.isShowingChildren ? "primary" : "success"}
              >
                |{/* {cardData.isShowingChildren ? <BsBoxArrowUp size="1.6rem" /> : <BsBoxArrowDown size="1.6rem" />} */}
              </Button>
            ) }
            
          </Card.Body>
        </Card>
      </div>
    );
  }

  function MakeOrgChart (cardProps: EproStructureProps) {
    return(
      <>
        {
          cardProps.first ? (
            <Tree label={makeCard(cardProps.data)}>
              { cardProps.data.isShowingChildren ? (
                cardProps.data.children?.map((item: EproInterface) => (
                  <>
                    { item.isShowingChildren ? (
                      typeof(item.children) !== 'undefined' ? (
                        <TreeNode label={makeCard(item)}>
                          { item.children?.length && <MakeOrgChart data={item} />}
                        </TreeNode>
                      ) : (
                        <TreeNode label={makeCard(item)} />
                      ) ) : (
                        <></>
                    )}
                  </>
                ))
              ) : (
                <></>
              ) }
            </Tree>
            ) : (
            <>
              {cardProps.data.children?.map((item: EproInterface) => (
                <>
                  { item.isShowingChildren ? (
                    typeof(item.children) !== 'undefined' ? (
                      <TreeNode label={makeCard(item)}>
                        { item.children?.length && <MakeOrgChart data={item} />}
                      </TreeNode>
                    ) : (
                      <TreeNode label={makeCard(item)} />
                    ) ) : (
                      <></>
                  )}
                </>
              ))}
            </>
          )
        }
      </>
    );
  }

  const first = true;
  const [orgChartContainer, setOrgChartContainer] = useState(MakeOrgChart({data, first}));
  const [count, setCount] = useState(0);

  useEffect(() => {
    const first = true;
    setOrgChartContainer(MakeOrgChart({data, first}));
    console.log("data changed");
    setCount(count + 1);
    console.log(count);
  }, [data])

  return(
    <>
      { orgChartContainer }
      {
        count
      }
    </>
  );
}