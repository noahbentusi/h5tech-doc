# 基本Ubuntu安全配置

## Deploy用户

1. 添加deploy用户

    #adduser deploy

2. 设置私钥登录

两种方法

2.1. 新建密钥

    #su deploy
    $ssh-keygen

在会HOME根目录下生成`.ssh`目录，下面分别有`id_rsa`（登录私钥）和`id_rsa.pub`（登录公钥）。
将`id_rsa.pub`中内容添加到`.ssh/authorized_keys`文件，就可以使用`id_rsa`文件登录服务器了。

    $cd ~/.ssh
    $cat id_rsa.pub >> authorized_keys

将`id_rsa`复制到本地，就可以使用这个文件进行登录了。

    $ssh -i keys/id_rsa deploy@yourip

2.2. 使用已有密钥

就是创建`.ssh/authorized_keys`文件，将已月密钥的公钥文件内容添加进去就可以了。

    #su deploy
    $mkdir ~/.ssh
    $cd ~/.ssh
    $vim authorized_keys

3. 给deploy添加sudo权限

在`/etc/sudoers`文件尾部添加

    deploy  ALL=NOPASSWD:ALL

deploy用户可以sudo命令使用root权限。

## 关闭SSH密码和ROOT登录

编辑`/etc/sshd_config`将配置项

* PermitRootLogin no
* PasswordAuthentication no

都设置成no。

然后重启ssh服务

    #sudo service ssh restart

## UFW防火墙控制

`ufw`是ubuntu在`iptables`基础默认安装的防火墙，它比`iptables`更为易用。如果没有`ufw`命令，可以使用

    $sudo apt-get install ufw

安装ufw。

启停ufw

    $sudo ufw enable
    $sudo ufw disable

查看ufw规则表

    $sudo ufw status verbose
    $sudo ufw status numbered  //显示规则编号

添加规则方法

    $sudo ufw (allow|deny) (<port> [tcp|udp]|from <ip>[/<mask>] [port <port>] to [<ip>|any] [port <port>])

例如：

    允许访问
    $sudo ufw allow port 80
    $sudo ufw allow port 80 tcp
    $sudo ufw allow from 192.168.0.2
    $sudo ufw allow from 192.168.0.0/24
    $sudo ufw allow from 192.168.0.2 port 8080 tcp to 127.0.0.1 port 11211 tcp

    拒绝访问
    $sudo ufw deny port 22

删除规则

    $sudo ufw delete <规则编号>

添加规则

    $sudo ufw insert <规则编号> [allow|deny] ...

## 安装其它组件

* openjdk-7-jdk
* nginx
* tomcat7
* nodejs-legacy

