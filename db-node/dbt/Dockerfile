FROM public.ecr.aws/sam/build-python3.9:latest-x86_64

COPY requirements.txt .

RUN mkdir -p python
RUN pip3 install -r requirements.txt -t python
RUN cp -r python /opt/

# Install helpers for package download and extraction
RUN yum install -y yum-utils rpmdevtools

# Download and extract git + deps
WORKDIR /tmp
# RUN yumdownloader pkgconfig.x86_64 libunistring.x86_64 openldap.x86_64 libssh2.x86_64 libidn2.x86_64 libnghttp2.x86_64 expat.x86_64 libcurl.x86_64 libcurl-devel.x86_64 pcre2.x86_64
RUN yumdownloader git.x86_64 git-core.x86_64 perl-Git
RUN rpmdev-extract *rpm

# Copy each package's usr sub-directories (bin, libexec, share) 
# to shared usr directory in artifacts directory to persist in layer
RUN cp -r /tmp/*/usr/* /opt/

# Copy utility libraries and supress "ommitting directory errors" (HACKY)
RUN mkdir /opt/lib64
RUN cp /usr/lib64/* /opt/lib64/ 2>/dev/null || :

WORKDIR /opt
RUN zip -yr DbtLayer.zip .
