<React.Fragment>
        
<div class="wrapper">
    <div class="container-fluid">
         
    <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Channels</a></li>
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Shows</a></li>
                            <li class="breadcrumb-item active">Episodes</li>
                        </ol>
                    </div>
                    <h4 class="page-title">ShowName -Episodes</h4>
                </div>
            </div>
      </div>     

        <div class="row">
            <div class="col-12">
                <div class="card-box">
                    <div class="row">
                        <div class="col-lg-8">
                            <form class="form-inline">
                                <div class="form-group">
                                    <label for="inputPassword2" class="sr-only">Search</label>
                                    <input type="search" class="form-control" id="inputPassword2" placeholder="Search..." />
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-4">
                            <div class="text-lg-right mt-3 mt-lg-0">
                                <button type="button" class="btn btn-danger waves-effect waves-light mr-1"><i class="mdi mdi-plus-circle mr-1"></i> Add New</button>
                            </div>
                        </div>
                    </div> 
                </div> 
            </div>
        </div>
     
   
            {this.props.episodes.map((cols) => (
        <Row>
          {cols.map((col) => (
            <Col lg={4} md={4}> 
                <div class="card">
                <div class="card-box">
          <h4 class="header-title">{col.name}</h4>
          <p class="sub-header">Episode Number <code>{col.number}</code></p>
                   
                 
                
                    <div class=" card-img-top img-fluid embed-responsive embed-responsive-21by9">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&showinfo=0&controls=0"></iframe>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
          <p class="card-text">{col.desc}</p>
                        <a href="javascript:void(0);" class="btn btn-primary waves-effect waves-light">Button</a>
                    </div>
                    </div>
                </div>
                </Col>
          ))}
        </Row>
      ))} 

    <div class="row">
            <div class="col-lg-6">
                <div class="card-box">
                    <h4 class="header-title">Responsive embed video 21:9</h4>
                    <p class="sub-header">Use class <code>.embed-responsive-21by9</code></p>
                   
                    <div class="embed-responsive embed-responsive-21by9">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&showinfo=0&controls=0"></iframe>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="card-box">
                    <h4 class="header-title">Responsive embed video 16:9</h4>
                    <p class="sub-header">Use class <code>.embed-responsive-16by9</code></p>
                  
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PrUxWZiQfy4?ecver=1"></iframe>
                    </div>
                </div>
            </div>
        </div>
   
    
      

       

      
    </div> 
</div>


</React.Fragment>