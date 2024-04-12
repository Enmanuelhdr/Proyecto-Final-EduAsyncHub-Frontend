interface Props {
    data: {
        niveles: {
            nombre: string;
            imagen: string;
            color: string;
            descripcion: string;
        }[];
    }
    fontSizeBig: boolean;
}

function Niveles(props: Props) {
    const { niveles } = props.data;
    const { fontSizeBig } = props;
    
    return (
        <div className="container py-1">
            <div className="row row-cols-1 row-cols-lg-3 g-4 py-2">
                {niveles.map((nivel, index) => (
                    <div className="col" key={index}>
                        <div className="bg-image rounded-4 h-100 hover-zoom">
                            <img src={nivel.imagen} className="w-100 h-100" />
                            <div className="mask" style={{ backgroundColor: 'hsla(0, 0%, 0%, 0.6)' }}>
                                <div className="bottom-0 d-flex flex-column h-100 align-items-center text-center justify-content-center">
                                    <div>
                                        {fontSizeBig ? (
                                            <h2 className="fw-bold text-white mb-4">{nivel.nombre}</h2>
                                        ) : (
                                            <h4 className="fw-bold text-white mb-4">{nivel.nombre}</h4>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Niveles;