import { useState } from "react";
import { 
    Skeleton,
    Timeline,
    Flex
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { TypeAnimation } from 'react-type-animation';
import styled from 'styled-components';

const TitleIntro = styled.div`
    padding: 34px 34px;
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    color: #fff;
    text-align: center;
    font-family: "Basier Circle Bold", Sans-serif;
`;

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[],
    isLoading: boolean
}

export const Results: React.FC<Props> = ({
    items,
    isLoading
}) => {
    const [textColor, setTextColor] = useState('#fff');

    return (
        <>
            {items.length === 0 && (
                <Flex 
                    vertical={true}
                    justify="center"
                    style={{ 
                        height: '68vh'
                    }}
                >
                    <TitleIntro>
                        <strong>We Can Help You</strong>  <br/>with
                    </TitleIntro>
                    <div
                        style={{
                        color: textColor,
                        fontStyle: 'italic'
                        /* when working without ref and classNames, the manipulated style needs to be
                        applied to the parent element, because the TypeAnimation component is perma-memoized */
                        }}
                    >
                        <TypeAnimation
                            sequence={[
                                500,
                                'Project pitch in Automotive industry', // initially rendered starting point
                                () => setTextColor('#e9787d'),
                                800,
                                'Summary of Life Sciences team capabilities',
                                800,
                                () => setTextColor('#e2306d'),
                                'Software development SoW',
                                800,
                                () => setTextColor('#ed7d4e'),
                                'Data engineering personnel capabilities',
                                800,
                                () => setTextColor('#b20672'),
                            ]}
                            wrapper="div"
                            cursor={true}
                            repeat={Infinity}
                            style={{ 
                                fontSize: '2em', 
                                fontWeight: 'bold', 
                                textAlign: 'center',
                                width: '100%',
                            }}
                        />
                    </div>
                </Flex>
            )}
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
