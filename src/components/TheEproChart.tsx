import { useContext, useEffect } from 'react'
import { Tree, TreeNode } from 'react-organizational-chart';
import { Card, Button} from 'react-bootstrap'
import { BsBoxArrowDown, BsBoxArrowUp } from 'react-icons/bs'
import { EproContext } from '../context/EproContext';

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

function EproChart (cardProps: EproStructureProps) {
  const { changeIsShowingChildren } = useContext(EproContext);
  
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
                {cardData.isShowingChildren ? <BsBoxArrowUp size="1.6rem" /> : <BsBoxArrowDown size="1.6rem" />}
              </Button>
            ) }
            
          </Card.Body>
        </Card>
      </div>
    );
  }
  
  return(
    <>
      {
        (cardProps.first ? (
          <Tree label={makeCard(cardProps.data)}>
            {cardProps.data.children?.map((item: EproInterface) => (
              <>
                { typeof(item.children) !== 'undefined' && item.isShowingChildren ? (
                  <TreeNode label={makeCard(item)}>
                    { item.children?.length && <EproChart data={item} />}
                  </TreeNode>
                ) : (
                  <TreeNode label={makeCard(item)} />
                ) }
              </>
            ))}
          </Tree>
          ) : (
          <>
            {cardProps.data.children?.map((item: EproInterface) => (
              <>
                { typeof(item.children) !== 'undefined' && item.isShowingChildren ? (
                  <TreeNode label={makeCard(item)}>
                    { item.children?.length && <EproChart data={item} />}
                  </TreeNode>
                ) : (
                  <TreeNode label={makeCard(item)} />
                ) }
              </>
            ))}
          </>
          )
        )
      }
    </>
  );
}

export function TheEproChart() {
  const { data } = useContext(EproContext);

  useEffect(() => {
    const first = true;
    EproChart({data, first})
  }, [data])

  return (
    <div className="epro-tree">
      <EproChart data={data} first={true} />
    </div>
  );
}