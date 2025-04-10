import {Divider, Flex, Tag, Typography} from 'antd';

export default function CoinInfoModal({ coin }){
    return (
        <>
        <CoinInfo coin={coin} withSymbol></CoinInfo>
        <Divider />
        <Typography.Paragraph>
            <Typography.Text strong>1 hour:</Typography.Text>
            <Tag 
            color={coin.priceChange1h < 0 ?  'green' : 'red'}>
                {coin.priceChange1h}%
                </Tag>
                <Typography.Text strong>1 day:</Typography.Text>
                <Tag 
                color={coin.priceChange1d < 0 ?  'green' : 'red'}>
                    {coin.priceChange1d}%
                </Tag>
                <Typography.Text strong>1 week:</Typography.Text>
                <Tag 
                color={coin.priceChange1w < 0 ?  'green' : 'red'}>
                {coin.priceChange1w}%
                </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price: {coin.price.toFixed(2)} $</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>PriceBTC: {coin.priceBtc}</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Marker Cap: {coin.marketCap} $</Typography.Text>
            </Typography.Paragraph>
            {coin.contractAddress && (<Typography.Paragraph>
                <Typography.Text strong>Contract Address: {coin.contractAddress}</Typography.Text>
            </Typography.Paragraph>)}
            <Typography.Paragraph>
                <Typography.Text strong>SocialMedia: {coin.redditUrl}</Typography.Text>
            </Typography.Paragraph>
            </>

    )
}