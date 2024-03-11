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
        <div className="container px-4">
            <h2 className='pb-2 fw-bold text-center text-primary'>Programas</h2>
            {/* <div className='row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-2'>
                {data.map(programa => (
                    <div className='col' key={programa.id}>
                        <div className='card card-cover h-100 overflow-hidden text-white rounded-4 shadow-lg' style={{backgroundImage: `url(${programa.imgProgram})`}}>
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 align-items-stretch">
                                <h2 className='pt-5 mt-5 mb-4 display-7 lh-2 fw-bold'>{programa.program}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}

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