export const ButtonBook = (props) => {
    const {
        label,
        onClick,
        marginTp,
        activeBtn
    } = props;

    const style = {
        width : '100%',
        maxWidth: '150px',
        border: '1px solid var(--primary)',
        fontSize: '15px',
        borderRadius: '5px',
        padding: '5px 0',
        color: 'var(--primary'
    }
    return (
        <button className={`bookButton ${marginTp ? marginTp : ''} ${activeBtn ? activeBtn : ''}`} onTouchMove={()=>alert('clik')} type="button" style={style} onClick={onClick}>{label}</button>
    )
}