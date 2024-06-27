const { useState } = React

export function TextboxRating({ handleChange, txt }) {
    const [textValue, setTextValue] = useState(txt);

    function onSetTxt(newTxt) {
        setTextValue(newTxt);
        handleChange({ target: { name: 'body', value: newTxt } }); // Assuming 'body' is the correct field name
    }

    return (
        <textarea
            name='txt'
            rows='20'
            value={textValue}
            onChange={(ev) => onSetTxt(ev.target.value)}
        ></textarea>
    );
}



