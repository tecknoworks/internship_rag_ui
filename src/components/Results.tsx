import { 
    Skeleton,
    Timeline,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[],
    isLoading: boolean
}

export const Results: React.FC<Props> = ({
    items,
    isLoading
}) => {
    
    return (
        <>
            <Timeline
                pending={isLoading && <Skeleton active />}
                pendingDot={<LoadingOutlined spin />}
                items={items}
                style={{
                    color: '#fff',
                }}
            />
        </>
    )
};
