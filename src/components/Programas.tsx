interface Programa {
    id: number;
    program: string;
    imgProgram: string;
}

interface PropsProgramas {
    data: Programa[];
}

function Programas(props: PropsProgramas) {
    const { data } = props;
    
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-lg-3">
                {data.map(programa => (
                    <div className="col py-2" key={programa.id}>
                        <div className="bg-image rounded-4 h-100 hover-zoom">
                            <img src={programa.imgProgram} className="w-100 h-100"/>
                            <div className="mask" style={{backgroundColor: 'hsla(0, 0%, 0%, 0.6)'}}>
                                <div className="d-flex flex-column h-100 align-items-center text-center justify-content-center p-5 pb-3">
                                    <div>
                                        <h2 className="fw-bold text-white mb-4">{programa.program}</h2>
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

export default Programas;